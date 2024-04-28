export default async function Page(props) {
  const response = await fetch(
    process.env.API_URL + `topics/${props.params.id}`,
    { cache: "no-store" }
  );
  const topic = await response.json();
  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
}
