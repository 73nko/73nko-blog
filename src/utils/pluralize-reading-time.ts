export default function pluralizeReadingTime(time: number) {
  return `${time} ${time > 1 ? 'mins' : 'min'} de lectura`;
}
