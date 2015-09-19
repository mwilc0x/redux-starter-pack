export default function fetchComponentData(dispatch, components) {
  const needs = components.reduce( (prev, current) => {
    return (current.needs || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
      .concat(prev);
  }, []);
  
  const promises = needs.map(need => dispatch(need.fn(need.url)));

  return Promise.all(promises);
}
