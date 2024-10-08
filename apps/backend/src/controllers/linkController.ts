import { Request, Response } from "express";
import { comments, links, votes } from "../mockDB";
import { getPaginatedData, getSortParams, promise } from "../utils";
import { faker } from "@faker-js/faker";
import orderBy from "lodash/orderBy";
import { merge } from "lodash";

export const createLink = async (
  req: Request<unknown, unknown, Pick<ILink, "title" | "image">>,
  res: Response
): Promise<void> => {
  try {
    const { title, image } = req.body;

    if (!title || !image) {
      res.status(400).json({ error: "Title and image are required" });
      return;
    }

    const newLink: ILink = {
      id: faker.database.mongodbObjectId(),
      title: title,
      image: image,
      createdAt: new Date().toISOString(),
      commentCount: 0,
      author: { id: faker.database.mongodbObjectId(), username: req.username! },
      userVote: null,
      votesCount: 0,
    };

    links.unshift(newLink);

    await promise(null);

    res.status(201).json(newLink);
  } catch (error: unknown) {
    // Type assertion for error
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const updateLink = async (req: Request, res: Response) => {
  try {
    const linkId = req.params.id;
    const updates = req.body;

    const link = links.find((link) => link.id === linkId);

    if (!link) {
      res.status(404).json({ message: "Link not found" });
      return;
    }

    merge(link, updates);

    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getLinks = async (req: Request, res: Response): Promise<void> => {
  const sorting = getSortParams(req);

  const searchTerm = (req.query?.searchTerm as string) || "";

  try {
    const data = links.map((link) => {
      const linkVotes = votes.filter((v) => v.linkId === link.id);
      const linkComments = comments.filter(
        (c) => c.linkId === link.id && !c.parentId
      );

      return {
        ...link,
        commentCount: linkComments.length,
        votesCount: linkVotes.length,
        userVote: linkVotes.find((v) => v.author.username === req.username),
      };
    });
    const result = await promise(
      getPaginatedData(
        req,
        orderBy(
          data,
          sorting.map((s) => s.sortBy),
          sorting.map((s) => s.sortDir)
        ).filter(
          (link) =>
            link.title.includes(searchTerm) ||
            link.author.username.includes(searchTerm)
        )
      )
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
};

export const getLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const link = links.find((link) => link.id === req.params.id);

    if (link) {
      res.json(link);
    } else {
      res.status(404).json({ message: "Link not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
};
