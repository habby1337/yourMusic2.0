import { API_URL } from "@/helpers/endpoints";
import { Link } from "react-router-dom";

export const AuthorizeMe = () => {
	return (
		<div className="container flex justify-center p-4 mt-10">
			<Link className="glow-button" to={`${API_URL}/auth.php`}>
				Login with Spotify
			</Link>
		</div>
	);
};
