import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  // Calculate the total number of feedback received
  const totalFeedback = good + neutral + bad;

  // Calculate the average score based on good and bad feedback
  const averageScore =
    totalFeedback > 0 ? (good - bad) / totalFeedback : 0;

  // Calculate the percentage of positive feedback
  const positivePercentage =
    totalFeedback > 0 ? (good / totalFeedback) * 100 : 0;

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Feedback overview
        </p>

        <h2>Statistics</h2>
      </div>

      {totalFeedback === 0 ? (
        <div className="rounded-2xl border border-border bg-surface-secondary p-6 text-center">
          <div className="mb-3 text-3xl">
            💭
          </div>

          <p className="font-medium text-text">
            No feedback given.
          </p>

          <p className="mt-1 text-sm text-text-muted">
            Choose an option above to submit your feedback.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-secondary">
          <table>
            <thead>
              <tr>
                <th className="text-left">
                  Statistic
                </th>

                <th className="text-right">
                  Value
                </th>
              </tr>
            </thead>

            <tbody>
              <StatisticLine
                text="Good"
                value={good}
              />

              <StatisticLine
                text="Neutral"
                value={neutral}
              />

              <StatisticLine
                text="Bad"
                value={bad}
              />

              <StatisticLine
                text="Total feedback"
                value={totalFeedback}
              />

              <StatisticLine
                text="Average score"
                value={averageScore.toFixed(2)}
              />

              <StatisticLine
                text="Positive feedback"
                value={`${positivePercentage.toFixed(2)}%`}
              />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Statistics;