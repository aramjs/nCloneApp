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
import { getUsername, setCookie } from "@/utils/cookie";
import { useNavigate } from "@tanstack/react-router";
import { useState, useMemo, FC, PropsWithChildren, useEffect } from "react";

export const Root: FC<PropsWithChildren> = ({ children }) => {
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();

  const username = getUsername();

  const [isAuthenticated, setIsAuthenticated] = useState(!!username);

  const [modalContext, setModalContext] = useState<
    Omit<IModalContext, "openModal" | "closeModal">
  >({});

  const Modal = modalContext.modalName
    ? modals[modalContext.modalName]
    : () => null;

  const contextValue = useMemo<IAuthContext>(
    () => ({
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
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Modal {...(modalContext.modalProps as any)} />
        {children}
      </ModalContext.Provider>
    </AuthContext.Provider>
  );
};
