import { orderBy as _orderBy } from "lodash";
import hotkeys from "hotkeys-js";

export default {
  computed: {
    orderedStepsAsc() {
      // return this.steps.sort((a, b) => a.order - b.order);
      return _orderBy(this.steps, "order", "asc");
    },

    orderedStepsDesc() {
      return _orderBy(this.steps, "order", "desc");
    },

    nextStep() {
      return (
        this.orderedStepsAsc.find((s) => s.order > this.currentStep.order) ||
        null
      );
    },

    previousStep() {
      return (
        this.orderedStepsDesc.find((s) => s.order < this.currentStep.order) ||
        null
      );
    },

    firstStep() {
      return this.orderedStepsAsc[0] || null;
    },

    currentStep() {
      return (
        this.orderedStepsAsc.find((s) => s.id == this.$route.query.step) ||
        this.firstStep
      );
    },

    currentStepIndex() {
      return (
        this.orderedStepsAsc.findIndex((s) => s.id == this.currentStep.id) + 1
      );
    },
  },

  mounted() {
    this.registerKeyboardShortcuts();
  },
  methods: {
    goToStep(step) {
      this.$router.push({
        query: {
          step: step.id,
        },
      });
    },
    registerKeyboardShortcuts() {
      hotkeys(
        "ctrl+shift+left, ctrl+shift+right, cmd+shift+left, cmd+shift+right",
        (event, handler) => {
          switch (handler.key) {
            case "ctrl+shift+left":
              if (this.previousStep) {
                this.goToStep(this.previousStep);
              }
              break;
            case "cmd+shift+left":
              if (this.previousStep) {
                this.goToStep(this.previousStep);
              }
              break;
            case "ctrl+shift+right":
              if (this.nextStep) {
                console.log("hi");
                this.goToStep(this.nextStep);
              }
              break;
            case "cmd+shift+right":
              if (this.nextStep) {
                this.goToStep(this.nextStep);
              }
              break;
          }
        }
      );
    },
  },
};
