const ErrorBoundary = ({ message }: { message: string }) => {
	return (
		<div>
			<h1>YOU BROKE EVERYTHING GOOD JOB *clap* *clap*</h1>
			<p>{message}</p>
		</div>
	);
};
export default ErrorBoundary;
