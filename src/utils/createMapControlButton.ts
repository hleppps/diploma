export const createMapControlButton = ({
  textContent,
  className,
  onClick,
}: {
  textContent: string;
  className?: string;
  onClick: () => void;
}) => {
  const controlButton = document.createElement('button');
  controlButton.textContent = textContent;
  if (className) {
    controlButton.className = className;
  }
  if (onClick) {
    controlButton.addEventListener('click', () => {
      onClick();
    });
  }
  return controlButton;
};
