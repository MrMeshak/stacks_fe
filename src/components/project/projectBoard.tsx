export interface IProjectBoardProps {
  stacks: { id: string }[];
}

export default function ProjectBoard({ stacks }: IProjectBoardProps) {
  return (
    <div>
      <h2>Stacks</h2>
      {stacks.map((stack) => (
        <p>{stack.id}</p>
      ))}
    </div>
  );
}
