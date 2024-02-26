import { signIn } from "next-auth/react";

interface SignInModalProps {
    closeModal: () => void;
}

export default function SignInModal({ closeModal }: SignInModalProps) {
    return (
        <div className="flex flex-col">
            <h1>Sign in to use this function!</h1>
            <button
                className="rounded-lg bg-black px-6 py-2"
                onClick={() => void signIn()}
            >
                yuup
            </button>
            <button
                className="rounded-lg bg-black px-6 py-2"
                onClick={closeModal}
            >
                nah
            </button>
        </div>
    );
}
