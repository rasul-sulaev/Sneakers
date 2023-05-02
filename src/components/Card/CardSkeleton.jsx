import ContentLoader from "react-content-loader";
import styles from "./Card.module.sass";

export const CardSkeleton = () => {
	return (
		<div className={styles.card}>
			<ContentLoader
				speed={2}
				width="100%"
				height="100%"
				viewBox="0 0 210 260"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="0" y="0" rx="10" ry="10" width="100%" height="112" />
				<rect x="0" y="130" rx="3" ry="3" width="100%" height="25" />
				<rect x="0" y="160" rx="3" ry="3" width="65%" height="25" />
				<rect x="0" y="85%" rx="5" ry="5" width="55%" height="35" />
				<rect x="79%" y="82%" rx="8" ry="8" width="44" height="44" />
			</ContentLoader>
		</div>
	)
}