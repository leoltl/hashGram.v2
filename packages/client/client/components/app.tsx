import React from "react";
import {
  gql, useQuery
} from "@apollo/client";

const ANY_QUERY = gql`
  query UserById {
  userById(id:"cc17bf4a-c725-41e4-aebb-3a8f54ae42ff") {
    id
    name
    email
  }
}
`

export const App: React.FC = () => {

  const { data, error } = useQuery(ANY_QUERY);

  console.log('data', data);
  console.log('error', error)

  return <p>Hello from Client testing recompile</p>
};
