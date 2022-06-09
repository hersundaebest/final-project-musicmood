import styled from "styled-components";

const Footer = () => {
    return (
        <>
        <div>
        <Wrapper>
        Coded with 🤍 by Sarah Huzarski
        </Wrapper>
        </div>
        </>
    )
}

const Wrapper = styled.div`
font-family: 'Poppins';
font-size: 12px;
font-weight: 400;
color: var(--primary-color);
text-align: center;
padding-bottom: 10px;
`

export default Footer;