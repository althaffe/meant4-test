import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import Form from "@/components/Form.vue";

describe("App", () => {
  let wrapper = shallowMount(App);

  it("should contain the title", () => {
    expect(wrapper.contains("h1")).to.be.true;
  });

  it("should render Form when mounted", () => {
    expect(wrapper.find(Form).exists()).to.be.true;
  });
});

describe("Form.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Form);
  });

  it("should render form fields correctly", () => {
    expect(wrapper.contains("form")).to.be.true;
    expect(wrapper.contains("input[name='name']")).to.be.true;
    expect(wrapper.contains("input[name='email']")).to.be.true;
    expect(wrapper.contains("input[name='subject']")).to.be.true;
    expect(wrapper.contains("textarea[name='message']")).to.be.true;
  });

  it("should render the button correctly", () => {
    expect(wrapper.contains("button")).to.be.true;
  });

  it("should render required errors correctly", async () => {
    wrapper.vm.submit();
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".name-error").text()).to.equal("Name is required");
    expect(wrapper.find(".email-error").text()).to.equal("Email is required");
    expect(wrapper.find(".message-error").text()).to.equal(
      "Message is required"
    );
  });

  it("should render name error correctly", async () => {
    wrapper.find("input[name='name']").setValue("test");
    wrapper.vm.submit();
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".name-error").text()).to.equal(
      "Name should be 5-50 characters long"
    );
  });

  it("should render email error correctly", async () => {
    wrapper.find("input[name='email']").setValue("test@t");
    wrapper.vm.submit();
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".email-error").text()).to.equal(
      "Please enter a valid email"
    );
  });

  it("should not render errors if form fields are valid", async () => {
    wrapper.find("input[name='name']").setValue("Test Name");
    wrapper.find("input[name='email']").setValue("test@example.agency");
    wrapper.find("input[name='subject']").setValue("Test Subject");
    wrapper.find("textarea[name='message']").setValue("Test Message");
    wrapper.vm.submit();
    await wrapper.vm.$nextTick();
    expect(wrapper.contains(".error")).to.be.false;
  });
});
