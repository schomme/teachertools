<template>
  <div class="grid">
    <div class="col">
      <div class="m-3">
        <Panel header="Einstellungen" toggleable collapsed>
          <Panel
            v-for="system in Settings"
            :key="system.display"
            :header="system.display"
            toggleable
            collapsed
          >
            <div
              v-for="(grade, index) in system"
              :key="grade.minpercent"
            >
              <table>
                <tbody>
                  <tr>
                    <td><label :for="'display_' + index">Note</label></td>
                    <td>
                      <InputText
                        :id="'display_' + index"
                        v-model="grade.display"
                      ></InputText>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label :for="'minpercent_' + index">Min. Prozent</label>
                    </td>
                    <td>
                      <InputNumber
                        :id="'minpercent_' + index"
                        v-model="grade.minpercent"
                        :show-buttons="index < system.length - 1"
                        :step="1"
                        :max="
                          index == 0
                            ? 100
                            : system[index - 1].minpercent - 1
                        "
                        :min="
                          index == system.length - 1
                            ? 0
                            : system[index + 1].minpercent + 1
                        "
                      ></InputNumber>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Divider v-if="index < system.length - 1" />
            </div>
          </Panel>
        </Panel>
      </div>
      <div class="m-3">
        <Panel header="Prozentrechnung" toggleable>
          <table>
            <tbody>
              <tr>
                <td><label for="maxpoints">Max. Punktzahl</label></td>
                <td>
                  <InputNumber
                    id="maxpoints"
                    v-model="PercentCalc.maxpoints"
                    show-buttons :min="0"
                  ></InputNumber>
                </td>
              </tr>
              <tr>
                <td><label for="points">Punkte</label></td>
                <td>
                  <InputNumber
                    id="points"
                    v-model="PercentCalc.points"
                    show-buttons :min="0" :max="PercentCalc.maxpoints"
                  ></InputNumber>
                </td>
              </tr>
              <tr>
                <td><label for="percent">Prozent</label></td>
                <td>
                  <InputNumber
                    id="percent"
                    :readonly="true"
                    :model-value="result.percent"
                    suffix="%"
                  ></InputNumber>
                  <InlineMessage
                    v-for="g in result.grades"
                    :key="g.display"
                    severity="info"
                    v-tooltip.bottom="'>='+ g.grade.minpercent+'%'"
                    >{{ g.grade.display }}</InlineMessage
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Panel from "primevue/panel";
import Divider from "primevue/divider";
import InlineMessage from "primevue/inlinemessage";

import { Gradesettings } from "./classes/Gradesettings";

const PercentCalc = reactive({
  maxpoints: 100,
  points: 70,
});

const Settings = reactive(new Gradesettings());

const result = computed(() => {
  var p = (PercentCalc.points / PercentCalc.maxpoints) * 100;
  return {
    percent: p,
    grades: [
      {
        display: Settings.normal.display,
        grade: Settings.normal.GetGrade(p),
      },
      {
        display: Settings.special.display,
        grade: Settings.special.GetGrade(p),
      },
    ],
  };
});
</script>

<style>
@import "primevue/resources/themes/bootstrap4-dark-blue/theme.css";
</style>
