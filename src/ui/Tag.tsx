import styled from "styled-components";

const Tag: any = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props: any) => props.type}-700);
  background-color: var(--color-${(props: any) => props.type}-100);
`;
export const OrderItemsTag: any = styled.span`
  width: fit-content;
  text-transform: lowercase;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props: any) => props.type}-700);
  background-color: var(--color-${(props: any) => props.type}-100);
`;

export default Tag;
