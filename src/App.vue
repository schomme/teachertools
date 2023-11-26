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
            <div>
              <table>
                <tr>
                  <td><label>Max. Prozent</label></td>
                  <td>
                    <InputNumber
                      v-model="system.maxpercent"
                      suffix="%"
                      show-buttons
                      :min="system[0].minpercent + 1"
                    />
                  </td>
                </tr>
                <tr>
                  <td><label>Max. Punkte</label></td>
                  <td>
                    <InputNumber
                      v-model="system.maxpoints"
                      show-buttons
                      :min="1"
                    />
                  </td>
                </tr>
              </table>
            </div>
            <Divider />
            <div v-for="(grade, index) in system" :key="grade.minpercent">
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
                            ? system.maxpercent - 1
                            : system[index - 1].minpercent - 1
                        "
                        :min="
                          index == system.length - 1
                            ? 0
                            : system[index + 1].minpercent + 1
                        "
                        suffix="%"
                      ></InputNumber>
                    </td>
                  </tr>
                  <tr>
                    <td><label>Min. Punkte</label></td>
                    <td>
                      <InputNumber
                        :model-value="system.GetPoints(grade.minpercent)"
                        readonly
                      />
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
            <thead>
              <tr>
                <th></th>
                <th>Normal</th>
                <th>Special</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Max. Punkte:</td>

                <td>{{ Settings.normal.maxpoints }} ({{ Settings.normal.maxpercent }}%)</td>
                <td>{{ Settings.special.maxpoints }} ({{ Settings.special.maxpercent }}%)</td>
              </tr>
              <tr>
                <td><label for="points">Punkte:</label></td>
                <td colspan="2">
                  <InputNumber
                    id="points"
                    v-model="PercentCalc.points"
                    show-buttons
                    :min="0"
                    :max="PercentCalc.maxpoints"
                  ></InputNumber>
                </td>
              </tr>
              <tr>
                <td>Prozent:</td>
                <td>
                  {{ Settings.normal.GetPercent(PercentCalc.points, 1) }}%
                </td>
                <td>
                  {{ Settings.special.GetPercent(PercentCalc.points, 1) }}%
                </td>
              </tr>
              <tr>
                <td>Note:</td>
                <td>
                  <InlineMessage severity="info" v-tooltip.bottom="Settings.normal.GetGrade(PercentCalc.points).minpercent + '%'">{{ Settings.normal.GetGrade(PercentCalc.points).display }}</InlineMessage>
                </td>
                <td>
                  <InlineMessage severity="info">{{ Settings.special.GetGrade(PercentCalc.points).display }}</InlineMessage>
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
import { reactive } from "vue";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Panel from "primevue/panel";
import Divider from "primevue/divider";
import InlineMessage from "primevue/inlinemessage";

import { Gradesettings } from "./classes/Gradesettings";

const PercentCalc = reactive({
  maxpoints: 100,
  points: 20,
});

const Settings = reactive(new Gradesettings());

</script>

<style>
@import "primevue/resources/themes/bootstrap4-dark-blue/theme.css";

td{
  text-align: center;
}
table{
  border: 1cap;
}
</style>
