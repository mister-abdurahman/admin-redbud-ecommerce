import styled from "styled-components";

const Radio = styled.input.attrs({ type: "radio" })`
  appearance: none; /* Remove default radio button styles */
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: 50%; /* Makes it circular */
  width: 1.6rem;
  height: 1.6rem;
  display: inline-block;
  position: relative;
  cursor: pointer;
  box-shadow: var(--shadow-sm);

  &:checked {
    border-color: var(--color-primary); /* Change border when selected */
    background-color: var(
      --color-primary
    ); /* Change background when selected */
  }

  &:checked::after {
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    background-color: var(--color-grey-0); /* Inner circle color */
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    border-color: var(
      --color-primary-light
    ); /* Slightly lighter border on hover */
    box-shadow: 0 0 0 4px var(--color-primary-opacity); /* Add hover effect */
  }

  &:focus {
    outline: 2px solid var(--color-primary-opacity); /* Add focus ring */
    outline-offset: 2px;
  }
`;

export default Radio;
