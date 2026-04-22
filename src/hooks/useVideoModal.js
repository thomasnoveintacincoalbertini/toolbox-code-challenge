import { useState, useCallback } from 'react';

const useVideoModal = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = useCallback((item) => {
    setSelectedItem(item);
    setModalVisible(true);
  }, []);

  // No se limpia el item al cerrar para que el contenido no desaparezca
  // durante la animación de salida del modal
  const handleModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  return { selectedItem, modalVisible, handleItemPress, handleModalClose };
};

export default useVideoModal;
