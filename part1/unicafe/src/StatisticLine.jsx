const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td className="border-b border-border py-4 pl-5 pr-6 text-sm font-medium text-text-secondary">
        {text}
      </td>

      <td className="border-b border-border py-4 pl-6 pr-5 text-right text-sm font-bold text-text">
        {value}
      </td>
    </tr>
  );
};

export default StatisticLine;