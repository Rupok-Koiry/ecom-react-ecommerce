type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <h2 className="text-3xl text-center text-primary-text py-8 font-medium">
      {message}
    </h2>
  );
};

export default ErrorMessage;
