export interface IModalProps {
  title: string;
  text: string;
  handleContinue: VoidFunction;
  handleExit?: VoidFunction;
}
