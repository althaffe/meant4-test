<template>
  <div>
    <form
      @submit.prevent="submit"
      class="input-form"
      v-if="!success"
      novalidate
    >
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model.trim="name"
          maxlength="50"
        />
        <small class="error name-error" v-if="errors.name">{{
          errors.name
        }}</small>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model.trim="email" />
        <small class="error email-error" v-if="errors.email">{{
          errors.email
        }}</small>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input
          type="text"
          name="subject"
          id="subject"
          v-model.trim="subject"
          maxlength="100"
        />
        <small class="error subject-error" v-if="errors.subject">{{
          errors.subject
        }}</small>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          name="message"
          id="message"
          v-model.trim="message"
          maxlength="500"
        ></textarea>
        <small class="error message-error" v-if="errors.message">{{
          errors.message
        }}</small>
      </div>
      <div v-if="submitError" class="error submit-error">
        Sorry, we encountered some error. Please try again.
      </div>
      <button class="btn-submit" :disabled="loading">
        <span v-if="loading">Please Wait...</span>
        <span v-else>Submit</span>
      </button>
    </form>
    <div class="success-message" v-else>
      <h2>Thank you for your feedback.</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Form",

  data: () => ({
    success: false,
    submitError: false,
    loading: false,
    name: null,
    email: null,
    subject: null,
    message: null,
    errors: {}
  }),

  methods: {
    validate() {
      if (!this.name) {
        this.errors.name = "Name is required";
      } else if (this.name.length < 5 || this.name.length > 50) {
        this.errors.name = "Name should be 5-50 characters long";
      }

      const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
      if (!this.email) {
        this.errors.email = "Email is required";
      } else if (!emailRegex.test(this.email)) {
        this.errors.email = "Please enter a valid email";
      }

      if (this.subject && this.subject.length > 100) {
        this.errors.subject = "Subject should be less than 100 character long";
      }

      if (!this.message) {
        this.errors.message = "Message is required";
      } else if (this.message.length > 500) {
        this.errors.message = "Message should be less than 500 character long";
      }
    },
    submit() {
      this.loading = true;
      this.submitError = false;
      this.errors = {};
      this.validate();
      if (Object.keys(this.errors).length) {
        this.loading = false;
        return;
      }

      const { name, email, subject, message } = this;
      axios
        .post("https://5d9f7fe94d823c0014dd323d.mockapi.io/api/message", {
          name,
          email,
          subject,
          message
        })
        .then(() => {
          this.success = true;
        })
        .catch(() => {
          this.submitError = true;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.input-form {
}
input,
textarea {
  -moz-appearance: none;
  -webkit-appearance: none;
  border: 1px solid #2c3e50;
  padding: 10px;
  width: 100%;
  font-size: 1.1rem;
}
textarea {
  height: 200px;
  resize: none;
}
label {
  display: block;
  margin-bottom: 10px;
  font-size: 1.1rem;
}
.form-group {
  margin-bottom: 20px;
}
.btn-submit {
  padding: 10px 20px;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: #2c3e50;
  color: #fff;
  border: 0;
  font-size: 1.1rem;
  cursor: pointer;
  margin-left: auto;
}
.btn-submit[disabled] {
  opacity: 0.5;
  cursor: default;
}
.error {
  color: red;
}
.submit-error {
  margin-bottom: 10px;
}
.success-message {
  text-align: center;
}
.success-message h2 {
  font-weight: normal;
}
</style>
