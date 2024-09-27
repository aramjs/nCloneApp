import {
  IAuthContext,
  AuthContext,
  ModalContext,
  IModalContext,
  ModalName,
  ModalProps,
} from "@/contexts";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { modals } from "@/modals";
import { ADMIN_ROUTES, COOKIE_KEY, ROUTES } from "@/types/enums";
import { getCookie, setCookie } from "@/utils/cookie";
import { useNavigate } from "@tanstack/react-router";
import { useState, useMemo, FC, PropsWithChildren, useEffect } from "react";

export const Main: FC<PropsWithChildren> = ({ children }) => {
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();

  const username =
    getCookie(isAdmin ? COOKIE_KEY.ADMIN_USERNAME : COOKIE_KEY.USERNAME) || "";

  const [isAuthenticated, setIsAuthenticated] = useState(!!username);

  const [modalContext, setModalContext] = useState<
    Omit<IModalContext, "openModal" | "closeModal">
  >({});

  const Modal = modalContext.modalName
    ? modals[modalContext.modalName]
    : () => null;

  const contextValue = useMemo<IAuthContext>(
    () => ({
      username,
      isAuthenticated,
      isAdmin,
      signIn: (email: string) => {
        setCookie(
          isAdmin ? COOKIE_KEY.ADMIN_USERNAME : COOKIE_KEY.USERNAME,
          email
        );
        setIsAuthenticated(true);
      },
      signOut: () => setIsAuthenticated(false),
    }),
    [isAdmin, isAuthenticated, username]
  );

  const modalValue = useMemo<IModalContext>(() => {
    return {
      ...modalContext,
      closeModal: () => setModalContext({}),
      openModal: <M extends ModalName>(
        modalName: M,
        modalProps: ModalProps<M>
      ) => {
        setModalContext({
          modalName,
          modalProps,
        });
      },
    };
  }, [modalContext]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: isAdmin ? ADMIN_ROUTES.HOME : ROUTES.HOME });
    }
  }, [isAdmin, isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={contextValue}>
      <ModalContext.Provider value={modalValue}>
        <Modal {...modalContext.modalProps!} />
        {children}
      </ModalContext.Provider>
    </AuthContext.Provider>
  );
};
