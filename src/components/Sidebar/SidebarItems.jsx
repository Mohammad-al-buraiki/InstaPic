import React from 'react';
import Home from './Home';
import Notifications from './Notifications';
import CreatePost from './CreatePost';
import ProfileLink from './ProfileLink';
import Search from './Search';
import { useTranslation } from 'react-i18next';
import { Button } from '@chakra-ui/react';
const SidebarItems = () => {
  const { t, i18n } = useTranslation(); // Added

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage); // Change language based on the current language
  };

  return (
    <>
      <Button onClick={toggleLanguage} size={'xs'}>
        {i18n.language === 'en' ? 'العربية' : 'English'} {/* Show Arabic when in English, and vice versa */}
      </Button>
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
