import { BotaoSubmit } from "@/theme/GlobalStyles";
import { ModalContent, ModalOverlay } from "@/theme/UserDashboardTheme";

export default function ModalEdit({ onClose, children }) {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {children}
                <BotaoSubmit onClick={onClose}>Salvar</BotaoSubmit>
            </ModalContent>
        </ModalOverlay>
    );
}
