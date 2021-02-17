import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'data',
  stateFactory: true,
  namespaced: true,
})
export default class Datas extends VuexModule {
  private uuid: String | null = null
  private modalTitle: String | null = null
  private modalMessage: String | null = null

  /**
   * Gets the UUID of the user page you are currently browsing.
   * Note: Null is always returned on the top page. Please do not get.
   */
  public get getUUID() {
    return this.uuid
  }

  /**
   * Gets the Modal Window Title
   */
  public get getModalTitle() {
    return this.modalTitle
  }

  /**
   * Gets the Modal Window Message
   */
  public get getModalMessage() {
    return this.modalMessage
  }

  /**
   * Set the UUID.
   * @param uuid UUID
   */
  @Mutation
  public setUUID(uuid: String) {
    this.uuid = uuid
  }

  /**
   * Show the Modal Window
   * @param title Modal Window Title
   * @param message Modal Window Message
   */
  @Mutation
  public showModal(title: String, message: String) {
    this.modalTitle = title
    this.modalMessage = message
  }

  /**
   * Close Modal Window
   * @param title Modal Window Title
   * @param message Modal Window Message
   */
  @Mutation
  public closeModal() {
    this.modalTitle = null
    this.modalMessage = null
  }

  /**
   * Fetch the User Data
   */
  @Action({ rawError: true })
  public async fetchUser() {
    // TODO ユーザーデータのフェッチ
  }
}
