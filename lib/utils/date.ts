const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
  timeStyle: "short",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateTime(value?: string) {
  if (!value) {
    return "Now";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Now";
  }

  return dateTimeFormatter.format(date);
}

export function formatTime(value?: string) {
  if (!value) {
    return "--:--";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  return timeFormatter.format(date);
}
