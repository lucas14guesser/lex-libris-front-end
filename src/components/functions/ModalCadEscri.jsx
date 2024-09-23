import { ModalContent, ModalOverlay } from "@/theme/UserDashboardTheme";

export default function ModalCadEscri({ onClose, children }) {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
}
