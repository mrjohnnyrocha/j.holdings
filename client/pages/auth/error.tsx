import { useRouter } from 'next/router';

export default function Error() {
  const router = useRouter();
  const { error } = router.query;

  const errorMessages: { [key: string]: string } = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'Access Denied. You do not have permission to sign in.',
    Verification: 'The verification token is expired or invalid.',
    Default: 'An unexpected error occurred. Please try again.',
  };

  const errorMessage = error ? errorMessages[error as string] : errorMessages['Default'];

  return (
    <div>
      <h1>Sign In Error</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
