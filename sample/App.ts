import { defineComponent } from "vue";
import { useValidator } from "../src";
type LoginCredentials = {
    userName: string;
    password: string;
}
export default defineComponent({
    setup(){
        var credentials = {
            userName: "hocahaenyi17@gmail.com",
            password: "cheesebehinddedoor"
        };
        var validator = useValidator<LoginCredentials>(credentials)
            .for("password").isRequired().next
            .for("userName").isEmail();
        
        var submit = () => {
            if (validator.isValid) {
                console.log("Is invalid");
            }
        }
        return {
            header: "Fluent-Vuelidate Sample",
            form: validator.fields
        }
    }
})