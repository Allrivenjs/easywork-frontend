import {
  useAppDispatch,
  useAppSelector,
} from '../store/hooks';

import {
  onFoundActiveProfile,
  onNotFoundActiveProfile
} from '../store/activeProfile';

import {
  getUserWithSlug,
} from '../shared/services/profileService';

export const useActiveProfileStore = () => {
  const { status, activeProfile } = useAppSelector( state => state.activeProfile );
  const dispatch = useAppDispatch();

  const startSetActiveProfile = async (slug: string) => {
    const res = await getUserWithSlug(slug);
    if (!res.ok) {
      dispatch(onNotFoundActiveProfile());
      return;
    }
    dispatch(onFoundActiveProfile(res.profile));
  };

  return {
    // properties
    activeProfile,
    status,

    // methods
    startSetActiveProfile
  };
};
