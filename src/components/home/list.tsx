interface ListProps {
  title: string;
  items: string[];
}

const List = ({ title, items }: ListProps) => {
  return (
    <div class="flex flex-row items-start p-4">
      <div class="border-2 border-slate-300 mr-2 h-full"/>
    <div class="flex flex-col">
      <h4 class="text-lg font-bold whitespace-nowrap pb-1">{title}</h4>
      <ul class="flex flex-col list-inside text-sm w-full items-start">
        {items.sort((a, b) => a.localeCompare(b)).map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default List;
