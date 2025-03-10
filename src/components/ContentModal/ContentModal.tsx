import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './ContentModal.module.scss';
import { useLang } from '../LangProvider/LangProvider';
import { TextButton } from '../ui/TextButton/TextButton';

export interface ContentModalProps {
  visible: boolean;
  children: ReactNode;
  showCloseButton?: boolean;
  handleClose?: () => void;
}

export const ContentModal: React.FC<ContentModalProps> = ({ visible, children, showCloseButton, handleClose }) => {
  const { getTranslate } = useLang();
  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalWindow}>
        <div className={styles.modalContent}>{children}</div>
        {showCloseButton && (
          <TextButton
            text={getTranslate('contentModal.close')}
            borderVisible={false}
            borderRounded={true}
            maxTextLength={Infinity}
            style={styles.modalCloseButton}
            handleClick={handleClose}
          />
        )}
      </div>
    </div>,
    document.body
  );
};
