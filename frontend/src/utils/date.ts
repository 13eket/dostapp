export const getNextWednesdaysAsStrings = (): string[] => {
  const today = new Date();
  const wednesdays: string[] = [];
  const day = today.getDay();
  const diff = day <= 3 ? 3 - day : 10 - day;

  for (let i = 0; i < 3; i += 1) {
    const nextWednesday = new Date(
      today.getTime() + (diff + i * 7) * 24 * 60 * 60 * 1000,
    );

    // Set the time to 19:00 (7 PM)
    nextWednesday.setHours(19, 0, 0, 0);

    wednesdays.push(
      nextWednesday.toLocaleDateString("ru-RU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }
  return wednesdays;
};

export const getNextWednesdays = (): Date[] => {
  const today = new Date();
  const wednesdays: Date[] = [];
  const day = today.getDay();
  const diff = day <= 3 ? 3 - day : 10 - day;

  for (let i = 0; i < 3; i += 1) {
    const nextWednesday = new Date(
      today.getTime() + (diff + i * 7) * 24 * 60 * 60 * 1000,
    );
    nextWednesday.setHours(16, 0, 0, 0); // Set the time to Kazakhstan time zone (TODO: fix by city location)
    wednesdays.push(nextWednesday);
  }
  return wednesdays;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
