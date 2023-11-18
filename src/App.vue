<template>
  <div class="grid">
    <div class="col">
      <div class="m-3">
        <Panel header="Einstellungen" toggleable collapsed>
          <Panel v-for="system in Settings" :key="system.display" :header="system.display" toggleable collapsed>
            <div v-for="(grade, index) in system.grades" :key="grade.minpercent">
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
                        :show-buttons="
                          index < system.grades.length - 1
                        "
                        :step="1"
                        :max="
                          index == 0
                            ? 100
                            : system.grades[index - 1].minpercent - 1
                        "
                        :min="
                          index == system.grades.length - 1
                            ? 0
                            : system.grades[index + 1].minpercent + 1
                        "
                      ></InputNumber>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Divider v-if="index < system.grades.length - 1" />
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
                  ></InputNumber>
                </td>
              </tr>
              <tr>
                <td><label for="points">Punkte</label></td>
                <td>
                  <InputNumber
                    id="points"
                    v-model="PercentCalc.points"
                  ></InputNumber>
                </td>
              </tr>
              <tr>
                <td><label for="percent">Prozent</label></td>
                <td>
                  <InputNumber
                    id="percent"
                    :readonly="true"
                    :model-value="grade.percent"
                    suffix="%"
                  ></InputNumber>
                  <InlineMessage severity="info">{{ grade.grade.display }}</InlineMessage>
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

const PercentCalc = reactive({
  maxpoints: 100,
  points: 70,
});

const Settings = reactive([
  {
    display: "Spezial",
    grades: [
      {
        display: "E1",
        minpercent: 92,
      },
      {
        display: "E2",
        minpercent: 81,
      },
      {
        display: "E3",
        minpercent: 75,
      },
      {
        display: "G3",
        minpercent: 50,
      },
      {
        display: "G4",
        minpercent: 40,
      },
      {
        display: "G5",
        minpercent: 25,
      },
      {
        display: "G6",
        minpercent: 0,
      },
    ],
  },
  {
    display: "Normal",
    grades: [
      {
        display: "1",
        minpercent: 92,
      },
      {
        display: "2",
        minpercent: 81,
      },
      {
        display: "3",
        minpercent: 75,
      },
      {
        display: "4",
        minpercent: 50,
      },
      {
        display: "5",
        minpercent: 40,
      },
      {
        display: "6",
        minpercent: 0,
      },
    ],
  },
]);

const grade = computed(
  () => {
    var p = PercentCalc.points / PercentCalc.maxpoints * 100
    var grade = GetGrade(Settings[0].grades, p)
    return {percent: p, grade: grade}
  });

const GetGrade = (grades, p) => {
  for(let i = 0; i < grades.length; i++){
    if(p >= grades[i].minpercent) return grades[i]
  }
  return grades[grades.length-1]
}


</script>

<style>
@import "primevue/resources/themes/bootstrap4-dark-blue/theme.css";
</style>
