import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
	const { user, logout } = useContext(AuthContext);

	const pathname = window.location.pathname;

	const path = pathname === "/" ? "home" : pathname.substr(1);
	const [activeItem, setActiveItem] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	if (Boolean(user && user.user)) {
		user.name = user.user.name;
	}

	const menubar = user ? (
		<Menu pointing secondary size="massive" color="blue">
			<Menu.Item name={"Welcome " + user.name} active as={Link} to="/" />
			<Menu.Menu position="right">
				<Menu.Item
					name="tags"
					active={activeItem === "tags"}
					onClick={handleItemClick}
					as={Link}
					to="/tags"
				/>
				<Menu.Item name="logout" onClick={logout} />
			</Menu.Menu>
		</Menu>
	) : (
		<Menu pointing secondary size="massive" color="blue">
			<Menu.Item
				name="home"
				active={activeItem === "home"}
				onClick={handleItemClick}
				as={Link}
				to="/"
			/>

			<Menu.Menu position="right">
				<Menu.Item
					name="tags"
					active={activeItem === "tags"}
					onClick={handleItemClick}
					as={Link}
					to="/tags"
				/>
				<Menu.Item
					name="login"
					active={activeItem === "login"}
					onClick={handleItemClick}
					as={Link}
					to="/login"
				/>
				<Menu.Item
					name="register"
					active={activeItem === "register"}
					onClick={handleItemClick}
					as={Link}
					to="/register"
				/>
			</Menu.Menu>
		</Menu>
	);

	return menubar;
}

export default MenuBar;
