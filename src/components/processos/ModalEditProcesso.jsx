import { BotaoSubmit } from "@/theme/GlobalStyles";
import { ModalContent, ModalOverlay } from "@/theme/UserDashboardTheme";

export default function ModalEdit({ onClose, children }) {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {children}
                <BotaoSubmit>Salvar</BotaoSubmit>
                <BotaoSubmit onClick={onClose}>Fechar</BotaoSubmit>
            </ModalContent>
        </ModalOverlay>
    );
}
