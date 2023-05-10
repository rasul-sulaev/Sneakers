import {useNavigate} from 'react-router-dom';
import {ReactComponent as IconArrowRight} from "../assets/img/icons/arrow-right.svg";

export const ContentInfo = ({
	img,
	title,
	description
}) => {
	const navigate = useNavigate();

	return (
		<section className="content-info content-info_empty">
			<img className="content-info__img" src={img.url} width={img.width} height={img.height} alt={img.alt}/>
			<h3 className="content-info__title">{title}</h3>
			<p className="content-info__description">{description}</p>
			<button
				className="content-info__btn btn btn_arrow-left"
				onClick={() => navigate(-1)}
			>
				<IconArrowRight stroke="currentColor" />
				Вернуться назад
			</button>
		</section>
	)
}