import { expect } from 'chai'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Home from '../../src/views/Home.vue';
import Vuetify from 'vuetify';
import PlaylistSaver from '../../src/components/PlaylistSaver.vue'
import fs from 'fs'
const fsPromises = fs.promises;

describe('PlaylistSaver.vue', () => {
  let data;

  beforeEach(async ()=> {
    data = await fsPromises.readFile("./src/assets/indexed-mul-data-clean.json", 'utf8');
    data = JSON.parse(data);
  })

  // Test the initial state of the component
  it('Should have valid initial component state', async ()=> {
    let localVue = createLocalVue();
    let vuetify = new Vuetify();

    let s = [];
    let counter = 0;
    for (let key in data.items) {
      if (counter >= 200) break;
      s.push(data.items[key]);
      counter++;
    }

    const wrapper = shallowMount(PlaylistSaver, {
      localVue,
      vuetify,
      propsData: {
        selected: s
      }
    })

    expect(wrapper.vm.overlay).to.equal(false);
    expect(wrapper.vm.title).to.equal("");
    expect(wrapper.vm.saving).to.equal(false);
    expect(wrapper.vm.loading).to.equal(true);
    expect(wrapper.vm.progress).to.equal(20);
    expect(wrapper.vm.error).to.equal(false);
    expect(wrapper.vm.success).to.equal(false);
  });

  it("Should have 200 divs with the class 'rounded-pill'", async ()=> {
    let localVue = createLocalVue();
    let vuetify = new Vuetify();

    let s = [];
    let counter = 0;
    for (let key in data.items) {
      if (counter >= 200) break;
      s.push(data.items[key]);
      counter++;
    }

    const wrapper = shallowMount(PlaylistSaver, {
      propsData: {
        selected: s
      }
    })

    expect

  });

  
  
})
