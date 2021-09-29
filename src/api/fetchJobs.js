export default function fetchJobs(data) {
  return data.map((item) => ({
    ...item,
    tags: [item.role, item.level, ...item.languages, ...item.tools],
  }));
}
