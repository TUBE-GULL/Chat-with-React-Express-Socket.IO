import React, { useState } from 'react';
import '../../../../node_modules/emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const EmojiPicker = () => {
   const [showPicker, setShowPicker] = useState(false);

   const handleTogglePicker = () => {
      setShowPicker(!showPicker);
   };

   const handleEmojiSelect = (emoji) => {
      // Обработка выбора смайла
      console.log(emoji);
      // Можно вставить смайл в ваше текстовое поле или другой контент
   };

   return (
      <div>
         <button onClick={handleTogglePicker}>Выбрать смайл</button>
         {showPicker && (
            <Picker
               onSelect={handleEmojiSelect}
               showPreview={false}
               showSkinTones={false}
            />
         )}
      </div>
   );
};

export default EmojiPicker;
