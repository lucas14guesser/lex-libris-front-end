import styled from 'styled-components';

export const ContainerConfig = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`
export const DivSubTitleArrowHandle = styled.div`
display: flex;
flex-direction: column;
gap: .3rem;
cursor: pointer;
margin-bottom: 1rem;
`
export const FormularioConfig = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
export const ContainerFormularioConfig = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: flex-start;
gap: 2rem;
`
export const DivLabelInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #000D20;
  padding: 1rem;
  border-radius: 4px;
  background-color: #FFFFFF;
  height: 4.5rem;
`
export const TextoLabelConfig = styled.label`
  display: flex;
  align-items: center;

  p {
    margin: 0 1rem 0 0;
  }

  input[type='checkbox'] {
    margin-right: 0.5rem;
  }
`
export const TimeInputContainer = styled.div`
  display: flex;
  gap: 1rem;

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5rem;
    font-size: 1rem;

    input[type='time'] {
      padding: .5rem;
      border: 1px solid #000D20;
      border-radius: 4px;
    }
  }
`
export const SaveButton = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: #000D20;
  color: #FFFFFF;
  border: 1px solid #000D20;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    transition: 0.3s;
    background-color: #FFFFFF;
    color: #000D20;
  }
`