import {useState,useEffect} from 'react';


export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [visibilityText, setVisibilityText] = useState('Show')
    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye' && visibilityText === 'Show') {
          setRightIcon('eye-slash');
          setVisibilityText('Hide');
          setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-slash' && visibilityText === 'Hide') {
          setRightIcon('eye');
          setVisibilityText('Show')
          setPasswordVisibility(!passwordVisibility);
        }
      };
    
      return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility,
        visibilityText
      };
  };