// import { create } from 'zustand';

// const useAuthStore = create(set => ({
//   user: JSON.parse(localStorage.getItem('user-info')),
//   login: user => set({ user }),
//   logout: () => set({ user: null }),
//   setUser: user => set({ user })
// }));

// export default useAuthStore;

///////////////////////////////////////////////////////////////////////////////
import { create } from 'zustand';

const useAuthStore = create(set => ({
  user: localStorage.getItem('user-info')
    ? JSON.parse(localStorage.getItem('user-info'))
    : null, // Handle the case where 'user-info' is not in localStorage
  login: user => {
    localStorage.setItem('user-info', JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('user-info');
    set({ user: null });
  },
  setUser: user => {
    localStorage.setItem('user-info', JSON.stringify(user));
    set({ user });
  }
}));

export default useAuthStore;
