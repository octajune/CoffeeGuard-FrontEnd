html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  background-image: linear-gradient(#ebc17a, #6657a6);
  background-attachment: fixed;
  font-family: "Work Sans", sans-serif;
  font-weight: 300;
  margin: 0;
}

h1 {
  margin-top: 0;
}

h1,
p {
  text-align: center;
}

.meme {
  width: auto;
  height: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.5);
}

hr {
  margin: 16px;
  border: 0;
  border-top: 2px solid grey;
}

.survey {
  background-color: antiquewhite;
  width: 80vw;
  max-width: 663px;
  min-width: 225px;
  margin: 2em auto;
  padding: 1.5em;
}

fieldset {
  border: 1px solid grey;
  margin: 1em 0;
}

legend {
  font-weight: 400;
}

label {
  display: block;
  margin: 0.5em 0;
}

label:first-of-type {
  margin-top: 0;
}

label:last-of-type {
  margin-bottom: 0;
}

input {
  width: 100%;
}

textarea {
  width: 100%;
  resize: vertical;
}

input,
select,
textarea {
  margin-top: 0.3em;
}

.inline {
  width: unset;
  margin: 0 0.5em 0 0;
}

select {
  display: block;
  width: 100%;
}

input[type="reset"],
input[type="submit"] {
  width: 30%;
  margin: 0.5em;
  height: 2.5em;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
