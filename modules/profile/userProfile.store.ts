import { create } from 'zustand'

import { UserProfileDataStateType } from './profile.types';
import { getUserProfileData } from './profile.service';


const userProfileStore = create<UserProfileDataStateType>((set, get) => ({
  isLoading: true,
  userProfileData: undefined,
  initiateUserProfileData: async () => {
    try {
      const res = await getUserProfileData()
      let tempData = undefined
      if (res.success) {
        tempData = res.user
      }
      return set(({
        userProfileData: tempData,
        isLoading: false
      }))

    } catch (error) {
      return set(({
        userProfileData: get().userProfileData,
        isLoading: false
      }))
    }
  },
}));

export default userProfileStore;



