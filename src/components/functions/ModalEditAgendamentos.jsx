import { BotaoSubmit } from "@/theme/GlobalStyles";
import { ModalContent, ModalOverlay } from "@/theme/UserDashboardTheme";

export default function ModalEditAgendamentos({ onClose, children }) {
    return (
        <ModalOverlay>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
}
