import styled from '@emotion/styled'


export const ModalWindow = styled.div`
position: fixed;
top: 0;
left: 0;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.5);
z-index: 1;
width: 100%;
height: 100%;

`;

export const ModalWindowContent = styled.div`
max-width: 100%;
max-height: 100%;
`;