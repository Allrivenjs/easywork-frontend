import { Select } from '@chakra-ui/react';

enum Difficulty {
	Easy = 'easy',
	EasyMedium = 'easy-medium',
	Medium = 'medium',
	MediumHard = 'medium-hard',
	Hard = 'hard',
}

interface DifficultySelectProps {
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DifficultySelect = (props: DifficultySelectProps) => {
	return(
		<Select
			name='difficulty'
			onChange={props.onChange}
		>
			<option value={Difficulty.Easy}>Facil</option>
			<option value={Difficulty.EasyMedium}>Semi-facil</option>
			<option value={Difficulty.Medium}>Medio</option>
			<option value={Difficulty.MediumHard}>Semi-dificil</option>
			<option value={Difficulty.Hard}>Dificil</option>
		</Select>
	);
};
