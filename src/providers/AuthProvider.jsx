import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const signInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth ,googleProvider);
    };

    const createUserWithEmail = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithEmail = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    };

    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth, async (currentUser)=>{
            setUser(currentUser);

            if(currentUser){
                const token = await currentUser.getIdToken(token);
                localStorage.setItem('e-tuition-token', token);
                setLoading(false);
            }else{
                localStorage.removeItem('e-tuition-token');
            }
            
            return () => unsubcribe();
        });
    }, []);




    const authinfo = {
        signInWithGoogle,
        createUserWithEmail,
        signInWithEmail,
        signOutUser,
        user,
        loading
    }
    return (
        <AuthContext value={authinfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;