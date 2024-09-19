import { BotaoSubmit } from "@/theme/GlobalStyles";
import { ModalContent, ModalOverlay } from "@/theme/UserDashboardTheme";

export default function Modal({ onClose, children }) {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {children}
                <BotaoSubmit onClick={onClose}>Fechar</BotaoSubmit>
            </ModalContent>
        </ModalOverlay>
    );
}
